INSERT INTO users(id, username, password) VALUES
(1, 'soheon lee', 'aaaa'),
(2, 'jaejun jo', 'bbbb');

INSERT INTO postings(id, user_id, contents) VALUES
(1, 1, 'you can do it'),
(2, 1, "hello world"),
(3, 2, 'backend is awesome!');

INSERT INTO comments(id, user_id, posting_id, comment) VALUES
(1, 2, 1, 'yes!'),
(2, 2, 2, 'hello!'),
(3, 2, 3, 'this is awesome!');