# Column Keywords
``` sql
primary_key=True
-- Marks this column as the table’s primary key (unique identifier). This column will uniquely identify rows, and it will be indexed automatically

index=True
-- Creates an index for this column to make searches faster. Useful for frequent lookups

unique=True
-- Ensures all values in this column are unique (no duplicates)

nullable=False
-- Prevents this column from storing NULL values. Equivalent to NOT NULL

default=value
-- Sets a default value if no value is provided

server_default=value
-- Sets a default value at the database server level

ForeignKey('table.column')
-- Creates a foreign key relationship to another table column

autoincrement=True
-- Automatically increments numeric primary key values (common for IDs)

comment="..."
-- Adds a comment to the column in the DB schema