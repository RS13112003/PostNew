-- schema.sql file
create table user(
    id varchar(50) primary key,
    username varchar(50)  not null,
    email varchar(50) not null,
    content varchar(255) not null,
    password varchar(50)  not null
);
-- Added to store the time when a user creates a post
-- This helps show newest users/posts at the top using ORDER BY created_at DESC

-- ALTER TABLE user
-- ADD created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
