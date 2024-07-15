-- call cp_panel.sp_create_user_profile(@err,2,'8962928781,"1995-12-10", "Web Developer", 'Hi i am a web developer', 'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg','Gwalior, Madhya Pradesh', @aid);

DROP PROCEDURE IF EXISTS cp_panel.sp_create_user_profile;

DELIMITER $$
CREATE PROCEDURE cp_panel.sp_create_user_profile(OUT error_code INT,
				                        IN in_app_user_id INT,
				                        IN in_phone BIGINT,
										IN in_dob DATE,
                                        IN in_designation VARCHAR(100),
                                        IN in_description TEXT,
                                        IN in_image TEXT,
										IN in_address TEXT,
                                        OUT out_user_profile_id INT
                                        )
BEGIN    


 DECLARE user_exists INT;

    SET error_code = -2;

    -- Check if the user_id already exists
    SELECT COUNT(*) INTO user_exists
    FROM cp_panel.user_profile
    WHERE user_id = in_app_user_id;

    IF user_exists = 0 THEN
        -- Insert new row if user doesn't exist
    INSERT INTO cp_panel.user_profile
        (user_profile_id,
		 user_id, 
		 phone, 
		 designation, 
		 description, 
		 image, 
		 address, 
		 status, 
		 created_id, 
		 created_dtm, 
		 modified_id, 
		 modified_dtm)
    VALUES
        (null,
		 in_app_user_id, 
		 in_phone, 
		 in_designation, 
		 in_description, 
		 in_image, 
		 in_address, 
		 1, 
		 in_app_user_id, 
		 CURRENT_TIMESTAMP, 
		 in_app_user_id, 
		 CURRENT_TIMESTAMP
		 );
     
    SET out_user_profile_id = LAST_INSERT_ID();
    SET error_code = 0;
	
    ELSE
	    -- User already exists, update the existing row
        UPDATE cp_panel.user_profile
        SET phone = in_phone,
            designation = in_designation,
            description = in_description,
            image = in_image,
            address = in_address,
            modified_id = in_app_user_id,
            modified_dtm = CURRENT_TIMESTAMP
        WHERE user_id = in_app_user_id;
        
        -- Get the existing user_profile_id
        SELECT user_profile_id INTO out_user_profile_id
        FROM cp_panel.user_profile
        WHERE user_id = in_app_user_id;
        
    SET error_code = 1; -- Indicate that an update occurred instead of an insert
    END IF;
	   
 
END$$
DELIMITER ;