-- call cp_panel.sp_create_user(@err,1,'sapna jain', 'sapna1@yahoo.com', '123458', '123456',1, @aid);

DROP PROCEDURE IF EXISTS cp_panel.sp_create_user;

DELIMITER $$
CREATE PROCEDURE cp_panel.sp_create_user(OUT error_code INT,
				                        IN in_app_user_id INT,
				                        IN in_name VARCHAR(100),
                                        IN in_email_address VARCHAR(100),
                                        IN in_password VARCHAR(255),
                                        IN in_otp INT,
										IN in_partner_id INT,
                                        OUT out_user_id INT
                                        )
BEGIN    


SET error_code=-2;

INSERT INTO cp_panel.user
       (user_id, 
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
       (NULL,
        in_name,
        in_email,
		in_password,
		in_otp,
		in_partner_id,
		null,
        1,
        in_app_user_id,
        CURRENT_TIMESTAMP,
        in_app_user_id,
        CURRENT_TIMESTAMP
       );
       
SET out_user_id=LAST_INSERT_ID();

SET error_code=0;
 
END$$
DELIMITER ;