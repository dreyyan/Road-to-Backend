from db import SessionLocal
from models import Base, User
from sqlalchemy import create_engine # for creating the db connection

session = SessionLocal() # create a new session
DATABASE_URL = "postgresql+psycopg2://postgres:qwpoeriuty123@localhost:5432/road_to_backend"

# Exercise 1: Create Tables
def create_user_table():
    engine = create_engine(DATABASE_URL, echo=True)
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    create_user_table()