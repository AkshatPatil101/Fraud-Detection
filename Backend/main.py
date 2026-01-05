import traceback
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

# Import your engine
from ml import FraudInferenceSystem

app = FastAPI(title="TechFiesta Fraud Guard V3")

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Engine
system = FraudInferenceSystem()

@app.post("/predict")
async def do_prediction(request: Request):
    try:
        # 1. Get the raw JSON body
        payload = await request.json()
        
        # 2. Extract the 'transaction' object specifically
        # This matches the nested structure you added to the frontend
        transaction_data = payload.get("transaction")
        
        if not transaction_data:
            raise HTTPException(status_code=422, detail="Missing 'transaction' key in JSON")

        print("\n" + "🔍" + "="*60)
        print(f"📥 REQUEST RECEIVED ID: {transaction_data.get('transaction_id')}")
        
        # 3. Pass the inner transaction data to the ML system
        result = system.predict(transaction_data)
        
        print(f"✅ VERDICT: {result.get('decision')} | Score: {result.get('final_score')}")
        print(result)
        return result

    except Exception as e:
        print("\n❌ CRASH IN ML ENGINE:")
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Internal Server Error: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)