from sqlalchemy.orm import declarative_base # for defining database tables
from sqlalchemy import create_engine # for creating the db connection
from sqlalchemy.orm import Session, sessionmaker # factory for sessions
from sqlalchemy import Column, Integer, String # define table columns

Base = declarative_base() # base class for models (blueprint for db models)

# database connection
# format: postgresql+driver://username:password@host:port/database
engine = create_engine("postgresql+psycopg2://postgres:qwpoeriuty123@localhost:5432/road_to_backend")

# session factory (temporary workspace)
SessionLocal = sessionmaker(bind=engine)
session = SessionLocal()