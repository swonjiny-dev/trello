-- 사용자 정보 테이블생성

CREATE TABLE `users` (
	`id` INT(20) NOT NULL AUTO_INCREMENT COMMENT '기본구분값',
	`email` VARCHAR(50) NOT NULL COMMENT '실제로그인사용자 id',
	`nickname` VARCHAR(50) NOT NULL COMMENT '사용할 닉네임',
	`password` VARCHAR(100) NOT NULL COMMENT '비밀번호',
	`level` CHAR(1) NOT NULL DEFAULT 'M' COMMENT 'A 관리자 M 일반사용자',
	`createdAt` DATETIME NOT NULL DEFAULT '생성일',
	`updatedAt` DATETIME NOT NULL COMMENT '수정일',
	PRIMARY KEY (`id`),
	UNIQUE INDEX `email` (`email`)
)
COMMENT='사용자'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;

