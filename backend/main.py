import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pathlib import Path
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.mount("/images", StaticFiles(directory="public"), name="images")

DATA_DIR = Path(__file__).parent / "data"


def read_json(filename: str):
  file_path = DATA_DIR / filename
  if not file_path.exists():
    return []
  with open(file_path, "r") as f:
    return json.load(f)
  
def write_json(filename: str, data):
  file_path = DATA_DIR / filename
  with open(file_path, "w") as f:
    json.dump(data, f, indent=2)
    
class Order(BaseModel):
  id: str | None = None
  items: list[dict]
  fullname: str
  email: str
  street: str
  city: str
  postal_code: str
  
  
@app.get("/meals")
async def get_meals():
  """Returns the list of meals from available-meals.json."""
  return read_json("available-meals.json")

@app.post("/orders")
async def place_order(order: Order):
  """Saves a new order to orders.json."""
  current_orders = read_json("orders.json")
  
  order_dict = order.dict()
  
  current_orders.append(order_dict)
  write_json("orders.json", current_orders)
  
  return {"message": "Order placed successfully", "order": order_dict}
  