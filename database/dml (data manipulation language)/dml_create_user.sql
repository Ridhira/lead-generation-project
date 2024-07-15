INSERT INTO cp_panel.user

(
    user_id, 
    name, 
    email_address,
	password,
	otp,
	partner_id,
	last_login,
    status, 
    created_id, 
    created_dtm, 
    modified_id, 
    modified_dtm
) 

VALUES 
(
    null, 
    'umesh sahu', 
    'umeshsahu32@gmail.com',
    123456, 
    123456,
    1,
    null,
	1,
	1,
    CURRENT_TIMESTAMP, 
    1,
    CURRENT_TIMESTAMP
);