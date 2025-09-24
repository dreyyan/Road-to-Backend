from sqlalchemy.orm import declarative_base # for defining database tables
from sqlalchemy import create_engine # for creating the db connection
from sqlalchemy.orm import sessionmaker # factory for sessions
from sqlalchemy import Column, Integer, String # define table columns

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

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)

# Add a new user
new_user = User(email="test@example.com")
session.add(new_user)
session.commit()
session.refresh(new_user)