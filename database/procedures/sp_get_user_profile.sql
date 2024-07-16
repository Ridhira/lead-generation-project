-- call cp_panel.sp_get_user_profile(@err,null);
-- call cp_panel.sp_get_user_profile(@err,2);

DELIMITER $$

DROP PROCEDURE IF EXISTS cp_panel.sp_get_user_profile$$

CREATE PROCEDURE cp_panel.sp_get_user_profile(
                                              OUT error_code INT,
                                              IN in_user_id INT
)
BEGIN

    SET error_code = -2;
	
    SET @q = CONCAT('
    SELECT  up.user_profile_id,
            up.user_id,
            cpu.name,
            cpu.email_address,		
            up.phone,
            up.dob,			
            up.designation,
            up.description,
            up.image,
            up.address,
            up.status
            
    FROM 
         cp_panel.user_profile up
		 
    JOIN cp_panel.user cpu 
	ON   cpu.user_id = up.user_id 
    WHERE 1 = 1');
 
    IF in_user_id IS NOT NULL THEN
        SET @q = CONCAT(@q, ' AND up.user_id = ', in_user_id);
    END IF;
 
    -- SELECT @q;
    PREPARE stmt FROM @q;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
 
    SET error_code = 0;
END$$
DELIMITER ;