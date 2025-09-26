from sqlalchemy.orm import declarative_base # for defining database tables
from sqlalchemy import inspect, create_engine # for creating the db connection
from sqlalchemy.orm import sessionmaker, relationship # factory for sessions
from sqlalchemy import Column, Integer, String, Numeric, TIMESTAMP, ForeignKey # define table columns
from sqlalchemy.sql import func

Base = declarative_base() # Base class for models (blueprint for db models)

# Database connection
# Format: postgresql+driver://username:password@host:port/database
engine = create_engine("postgresql+psycopg2://postgres:qwpoeriuty123@localhost:5432/road_to_backend")

# Session factory (temporary workspace)
SessionLocal = sessionmaker(bind=engine)
session = SessionLocal()

# 'Author' model
class Author(Base):
    __tablename__ = "author"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False, default="N/A")
    books = relationship("Book", back_populates="author")

# 'Book' model
class Book(Base):
    __tablename__ = "book"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(100), unique=True, nullable=False)
    author_id = Column(Integer, ForeignKey('author.id'), index=True, nullable=False)
    author = relationship("Author", back_populates="books")

# Create tables (runs CREATE TABLE if non-existing)
Base.metadata.create_all(bind=engine)

inspector = inspect(engine)