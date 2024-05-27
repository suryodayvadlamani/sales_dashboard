import json
import random
from faker import Faker
from datetime import datetime, timedelta

import json


# Initialize Faker for data generation
fake = Faker()

# Helper functions
def random_date(start, end):
    """Generate a random datetime between `start` and `end`"""
    return start + timedelta(
        seconds=random.randint(0, int((end - start).total_seconds())),
    )

def generate_dealerships(num_records):
    dealerships = []
    for _ in range(num_records):
        dealerships.append({
            "dealership_id":fake.uuid4(),
            "name": fake.company(),
            "location": fake.address().replace('\n', ', '),
            "phone_number": fake.phone_number(),
            "email": fake.email(),
            "manager_name": fake.name(),
            "lat":fake.location.latitude(),
            "long":fake.location.longitude()
        })
    return dealerships


def generate_salespersons(num_records, dealership_ids):
    salespersons = []
    for _ in range(num_records):
        salespersons.append({
            "salesperson_id":fake.uuid4(),
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "email": fake.email(),
            "phone_number": fake.phone_number(),
            "hire_date": random_date(datetime.now() - timedelta(days=365*6), datetime.now()).date().isoformat(),
            "dealership_id": random.choice(dealership_ids)
        })
    return salespersons

def generate_customers(num_records):
    customers = []
    for _ in range(num_records):
        customers.append({
              "customer_id":fake.uuid4(),
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "email": fake.email(),
            "phone_number": fake.phone_number(),
            "address": fake.address().replace('\n', ', '),
            "city": fake.city(),
            "state": fake.state_abbr(),
            "zip_code": fake.zipcode(),
            "registration_date": random_date(datetime.now() - timedelta(days=365*6), datetime.now()).date().isoformat()
        })
    return customers

def generate_vehicles(num_records, dealership_ids):
    vehicles = []
    makes = ['Toyota', 'Ford', 'Chevrolet', 'Honda', 'Nissan']
    models = ['Camry', 'F-150', 'Silverado', 'Civic', 'Altima']
    colors = ['Red', 'Blue', 'Black', 'White', 'Silver']
    for _ in range(num_records):
        vehicles.append({
             "vehicle_id":fake.uuid4(),
            "make": random.choice(makes),
            "model": random.choice(models),
            "year": random.randint(2010, 2023),
            "vin": fake.unique.vin(),
            "color": random.choice(colors),
            "mileage": random.randint(0, 200000),
            "price": round(random.uniform(5000, 50000), 2),
            "status": random.choice(['available', 'sold', 'under maintenance']),
            "dealership_id": random.choice(dealership_ids)
        })
    return vehicles

def generate_sales(num_records, customer_ids, vehicle_ids, salesperson_ids, dealership_ids):
    sales = []
    payment_methods = ['cash', 'credit', 'financing']
    for _ in range(num_records):
        sales.append({
             "sale_id":fake.uuid4(),
            "customer_id": random.choice(customer_ids),
            "vehicle_id": random.choice(vehicle_ids),
            "salesperson_id": random.choice(salesperson_ids),
            "dealership_id": random.choice(dealership_ids),
            "sale_date": random_date(datetime.now() - timedelta(days=365*6), datetime.now()).date().isoformat(),
            "sale_price": round(random.uniform(5000, 50000), 2),
            "payment_method": random.choice(payment_methods),
            "warranty_included": random.choice([True, False])
        })
    return sales

def generate_aftersales_service(num_records, sale_ids):
    services = []
    for _ in range(num_records):
        services.append({
            "service_id":fake.uuid4(),
            "sale_id": random.choice(sale_ids),
            "service_date": random_date(datetime.now() - timedelta(days=365*6), datetime.now()).date().isoformat(),
            "service_description": fake.sentence(),
            "service_cost": round(random.uniform(50, 1000), 2),
            "service_provider": fake.company()
        })
    return services

def generate_inventory(num_records, dealership_ids, vehicle_ids):
    services = []
    for _ in range(num_records):
        services.append({
            "inventory_id":fake.uuid4(),
            "vehicle_id": random.choice(vehicle_ids),
            "dealership_id": random.choice(dealership_ids),
            "date_added": random_date(datetime.now() - timedelta(days=365*6), datetime.now()).date().isoformat(),
            "status": random.choice(["available", "sold", "reserved", "maintenance"]),
            "stock_quantity": random.randint(1, 20)
        })
    return services

# Generate data
dealerships = generate_dealerships(10)
dealership_ids = list(map(lambda x: x.dealership_id, dealerships))

salespersons = generate_salespersons(50, dealership_ids)
salesperson_ids = list(map(lambda x: x.salesperson_id, salespersons))

customers = generate_customers(500)
customer_ids = list(map(lambda x: x.customer_id, customers))


vehicles = generate_vehicles(1000, dealership_ids)
vehicle_ids = list(map(lambda x: x.vehicle_id, vehicles))


sales = generate_sales(2000, customer_ids, vehicle_ids, salesperson_ids, dealership_ids)
sale_ids = list(map(lambda x: x.sale_id, sales))

aftersales_services = generate_aftersales_service(1000, sale_ids)
inventory = generate_inventory(600, dealership_ids, vehicle_ids)

# Convert to JSON
data = {
    "dealerships": dealerships,
    "salespersons": salespersons,
    "customers": customers,
    "vehicles": vehicles,
    "sales": sales,
    "aftersales_services": aftersales_services,
    "inventory":inventory
}

with open('dealerships.json', 'w', encoding='utf-8') as f:
    json.dump({"dealerships": dealerships,}, f, ensure_ascii=False, indent=4)
with open('salespersons.json', 'w', encoding='utf-8') as f:
    json.dump({"salespersons": salespersons,}, f, ensure_ascii=False, indent=4)
with open('customers.json', 'w', encoding='utf-8') as f:
    json.dump({"customers": customers,}, f, ensure_ascii=False, indent=4)
with open('vehicles.json', 'w', encoding='utf-8') as f:
    json.dump({"vehicles": vehicles,}, f, ensure_ascii=False, indent=4)
with open('sales.json', 'w', encoding='utf-8') as f:
    json.dump({"sales": sales,}, f, ensure_ascii=False, indent=4)
with open('aftersales_services.json', 'w', encoding='utf-8') as f:
    json.dump({"aftersales_services": aftersales_services,}, f, ensure_ascii=False, indent=4)
with open('inventory.json', 'w', encoding='utf-8') as f:
    json.dump({"inventory": inventory,}, f, ensure_ascii=False, indent=4)

