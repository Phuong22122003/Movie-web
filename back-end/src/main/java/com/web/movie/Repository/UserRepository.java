package com.web.movie.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.web.movie.Entity.User;
@Repository
public interface UserRepository extends JpaRepository<User,String>{
    @Query("FROM User u where u.username=:username")
    public Optional<User> findByUsername(@Param("username")String username);
}
