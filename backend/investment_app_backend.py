from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import yfinance as yf
import json
from datetime import datetime
import os

app = FastAPI(title="Forge Investment Research API", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_stock_quote(ticker: str) -> Dict[str, Any]:
    try:
        stock = yf.Ticker(ticker)
        info = stock.info
        hist = stock.history(period="5d")
        current_price = hist['Close'].iloc[-1] if not hist.empty else info.get('currentPrice', 0)
        prev_close = hist['Close'].iloc[-2] if len(hist) > 1 else info.get('previousClose', current_price)
        change = current_price - prev_close
        change_pct = (change / prev_close * 100) if prev_close else 0
        return {
            "ticker": ticker.upper(),
            "current_price": round(current_price, 2),
            "change": round(change, 2),
            "change_pct": round(change_pct, 2),
            "volume": int(hist['Volume'].iloc[-1]) if not hist.empty else info.get('volume', 0),
            "market_cap": info.get('marketCap'),
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        return {"error": str(e), "ticker": ticker}

def get_key_financials(ticker: str) -> Dict[str, Any]:
    try:
        stock = yf.Ticker(ticker)
        info = stock.info
        return {
            "ticker": ticker.upper(),
            "revenue_ttm": info.get('totalRevenue'),
            "ebitda_ttm": info.get('ebitda'),
            "net_income_ttm": info.get('netIncomeToCommon'),
            "total_debt": info.get('totalDebt'),
            "cash": info.get('totalCash'),
            "gross_margin": info.get('grossMargins'),
            "operating_margin": info.get('operatingMargins'),
            "profit_margin": info.get('profitMargins'),
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        return {"error": str(e), "ticker": ticker}

class IntakeProfile(BaseModel):
    age: Optional[int] = 50
    total_portfolio_value: Optional[float] = 425000
    risk_tolerance: Optional[str] = "Balanced"
    time_horizon: Optional[str] = "5-10 years"
    primary_ticker: Optional[str] = None
    current_position: Optional[str] = "WATCHING"
    directional_view: Optional[str] = "NEUTRAL"
    concerns: Optional[str] = ""

class AnalysisRequest(BaseModel):
    profile: IntakeProfile
    ticker: str = Field(...)
    analysis_type: str = Field(...)
    additional_context: Optional[str] = ""

@app.post("/analyze")
async def analyze(request: AnalysisRequest):
    try:
        live_quote = get_stock_quote(request.ticker)
        live_financials = get_key_financials(request.ticker)

        prompt = f"""You are a senior institutional analyst performing {request.analysis_type} for {request.ticker}.

**Live Market Data (just fetched)**
Quote: {json.dumps(live_quote, indent=2)}
Financials: {json.dumps(live_financials, indent=2)}

**Investor Profile**
Age: {request.profile.age}
Risk: {request.profile.risk_tolerance}
Horizon: {request.profile.time_horizon}
Position: {request.profile.current_position}

**Specific Concerns**: {request.profile.concerns or 'None'}

Provide a professional analysis."""

        return {
            "status": "success",
            "ticker": request.ticker.upper(),
            "analysis_type": request.analysis_type,
            "live_data": {"quote": live_quote, "financials": live_financials},
            "prompt": prompt,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "healthy"}