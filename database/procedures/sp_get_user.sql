-- call cp_panel.sp_get_user(@err,null, null);
-- call cp_panel.sp_get_user(@err,1, null);
-- call cp_panel.sp_get_user(@err,null, 'umeshsahu32@gmail.com');

DELIMITER $$

DROP PROCEDURE IF EXISTS cp_panel.sp_get_user$$

CREATE  PROCEDURE cp_panel.sp_get_user(OUT error_code INT,
                                       IN in_user_id INT,
									   IN in_email_address VARCHAR(100)
                                       )
									   
BEGIN
SET error_code = -2;
SET @q = CONCAT('
select  user_id, 
        name,
	    password,
		otp,
		partner_id,
        email_address,
		last_login,
        status
        
  FROM 
        cp_panel.user n
     
 WHERE  1 = 1  ');
 
 IF in_user_id IS NOT NULL THEN
 SET @q = CONCAT(@q,' AND user_id = ',in_user_id);
 END IF;
 
 IF in_email_address IS NOT NULL THEN
 SET @q = CONCAT(@q,' AND email_address = ','"',in_email_address, '"');
 END IF;
 
 

 -- SELECT @q;
  PREPARE stmt FROM @q;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;
 
SET error_code = 0;
END$$

DELIMITER ;