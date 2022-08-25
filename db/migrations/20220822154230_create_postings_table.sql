-- migrate:up
CREATE TABLE postings (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
	contents VARCHAR(2000) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT postings_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE postings;