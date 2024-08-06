package com.web.movie.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.web.movie.Entity.WebUser;
@Repository
public interface UserRepository extends JpaRepository<WebUser,String>{
    @Query("FROM WebUser u where u.username=:username")
    public WebUser findUserByUsername(@Param("username")String username);
}
