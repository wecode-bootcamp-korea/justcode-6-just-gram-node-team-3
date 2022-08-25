INSERT INTO users(id, email, nickname, password, profile_image)  VALUES
(1, '이메일입력', '닉네임입력', '비밀번호입력', '프로필사진입력'),
(1, '이메일입력', '닉네임입력', '비밀번호입력', '프로필사진입력');

INSERT INTO postings(id, user_id, contents)  VALUES
(1, '유저 아이디입력', '컨텐츠입력'),
(1, '유저 아이디입력', '컨텐츠입력');

INSERT INTO posting_images(id, posting_id, image_url)  VALUES
(1, '포스팅 아이디입력', '사진url'),
(1, '포스팅 아이디입력', '사진url');

INSERT INTO comments(id, posting_id, comment, user_id)  VALUES
(1, '포스팅아이디', '코멘트입력', '유저 아이디 입력'),
(1, '포스팅아이디', '코멘트입력', '유저 아이디 입력';