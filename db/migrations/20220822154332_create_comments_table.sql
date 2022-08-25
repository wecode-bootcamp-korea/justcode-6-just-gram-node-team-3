-- migrate:up
CREATE TABLE comments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  comment VARCHAR(2000) NULL,
	posting_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT comments_posting_id_fkey FOREIGN KEY (posting_id) REFERENCES postings(id) ON DELETE cascade;,
  CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE comments;