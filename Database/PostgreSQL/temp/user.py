from sqlalchemy.orm import declarative_base # for defining database tables
from sqlalchemy import inspect, create_engine # for creating the db connection
from sqlalchemy.orm import sessionmaker # factory for sessions
from sqlalchemy import Column, Integer, String, Numeric, TIMESTAMP # define table columns
from sqlalchemy.sql import func

Base = declarative_base() # Base class for models (blueprint for db models)

# Database connection
# Format: postgresql+driver://username:password@host:port/database
engine = create_engine("postgresql+psycopg2://postgres:qwpoeriuty123@localhost:5432/road_to_backend")

# Session factory (temporary workspace)
SessionLocal = sessionmaker(bind=engine)
session = SessionLocal()

# 'User' model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(String(50), unique=True, nullable=False)
    username = Column(String(50), unique=True)
    created_at = Column(TIMESTAMP, server_default=func.now(), nullable=False)

# Create tables (runs CREATE TABLE if non-existing)
Base.metadata.create_all(bind=engine)

inspector = inspect(engine)

# Display tables
# tables = inspector.get_table_names()
# print(tables)

columns = inspector.get_columns("products")
for column in columns:
    print(f"Column: {column['name']}, Type: {column['type']}")

# Query users
# users = session.query(Product).all()
# for u in users:
#     print(u.id, u.name, u.price)