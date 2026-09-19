"""
Minimal Backend API
===================
Exposes the Day 6 live domain prediction pipeline to a future frontend.
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from src.predict import predict_domain

app = FastAPI(
    title="DNS Tunneling Detection API",
    description="Academic API exposing the Random Forest live domain prediction pipeline.",
    version="1.0.0"
)

class PredictionRequest(BaseModel):
    domain: str

@app.post("/predict")
def predict(request: PredictionRequest):
    """
    Accepts a domain string and returns the model prediction.
    """
    if not request.domain or not request.domain.strip():
        raise HTTPException(status_code=400, detail="Domain string cannot be empty")
        
    try:
        # Reuses the exact prediction pipeline built in Day 6.1
        # Includes sanitization, 8-feature extraction, and RF inference.
        result = predict_domain(request.domain)
        
        if "error" in result:
             raise HTTPException(status_code=400, detail=result["error"])
             
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
