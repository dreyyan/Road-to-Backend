from sqlalchemy.orm import declarative_base # for defining database tables
from sqlalchemy import inspect, create_engine # for creating the db connection
from sqlalchemy.orm import sessionmaker # factory for sessions
from sqlalchemy import Column, Integer, String, Numeric, TIMESTAMP, Boolean # define table columns
from sqlalchemy.sql import func

Base = declarative_base() # Base class for models (blueprint for db models)

# Database connection
# Format: postgresql+driver://username:password@host:port/database
engine = create_engine("postgresql+psycopg2://postgres:qwpoeriuty123@localhost:5432/road_to_backend")

# Session factory (temporary workspace)
SessionLocal = sessionmaker(bind=engine)
session = SessionLocal()

# 'Task' model
class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(String(1000), nullable=True)
    completed = Column(Boolean, default=False)
    priority = Column(Integer, default=1)

# Create tables (runs CREATE TABLE if non-existing)
Base.metadata.create_all(bind=engine)

inspector = inspect(engine)

# Display tables
# tables = inspector.get_table_names()
# print(tables)

columns = inspector.get_columns("tasks")
for column in columns:
    print(f"Column: {column['name']}, Type: {column['type']}")

# Query users
users = session.query(Task).all()
for u in users:
    print(u.id, u.name, u.price)