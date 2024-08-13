from fastapi import FastAPI, Body
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware
import pickle

with open('car_price.pkl', 'rb') as file:
    model = pickle.load(file)

app = FastAPI()

class Placement(BaseModel):
    year: int


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.get('/')
async def hello():
    return {'Hello':'COSC'}

@app.post('/predict')
async def predict(placement: Placement):
    year=placement.year
    query=[[year]]
    op=model.predict(query)
    return {'the prediction is:': op[0]}
    
