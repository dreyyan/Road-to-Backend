from sqlalchemy.orm import declarative_base # for defining database tables
from sqlalchemy import create_engine # for creating the db connection
from sqlalchemy.orm import sessionmaker # factory for sessions
from sqlalchemy import Column, Integer, String # define table columns

Base = declarative_base() # base class for models (blueprint for db models)

# database connection
# format: postgresql+driver://username:password@host:port/database
engine = create_engine("postgresql+psycopg2://postgres:qwpoeriuty123@localhost:5432/road_to_backend")

# session factory (temporary workspace)
SessionLocal = sessionmaker(bind=engine)
session = SessionLocal()

# 'User' model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)

# Create tables (runs CREATE TABLE if non-existing)
Base.metadata.create_all(bind=engine)

# Add a new user
# new_user = User(email="adriandominic.tan@wvsu.edu.ph")
# session.add(new_user)
# session.commit()
# session.refresh(new_user)  # refresh to get auto-generated id

# Query users
# users = session.query(User).all()
# for u in users:
#     print(u.id, u.email)