
-- call cp_panel.sp_edit_user (@err, 1,4, 'vishal soni', null, null,null, null, null);


DROP PROCEDURE IF EXISTS cp_panel.sp_edit_user ;

DELIMITER $$
CREATE PROCEDURE cp_panel.sp_edit_user (OUT error_code INT,
				                      IN in_app_user_id INT,
				                      IN in_user_id INT,
				                      IN in_name VARCHAR(100),
                                      IN in_email_address VARCHAR(100),
                                      IN in_password VARCHAR(255),
                                      IN in_otp BIGINT,
                                      IN in_partner_id INT,
                                      IN in_status TINYINT
                                     )

BEGIN
SET error_code=-2;

UPDATE cp_panel.user 
SET 	
               name          = IFNULL(in_name, name),
               email_address = IFNULL(in_email_address, email_address), 
               password      = IFNULL(in_password, password),
               otp           = IFNULL(in_otp, otp),
               partner_id    = IFNULL(in_partner_id, partner_id),
               status        = IFNULL(in_status, status),
               modified_id   = in_app_user_id
        
WHERE
               user_id = in_user_id;

SET error_code=0;  

END$$
DELIMITER ;