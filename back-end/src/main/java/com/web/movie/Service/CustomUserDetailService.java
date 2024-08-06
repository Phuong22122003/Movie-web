package com.web.movie.Service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.web.movie.Repository.UserRepository;
@Service
public class CustomUserDetailService implements UserDetailsService{
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        com.web.movie.Entity.WebUser webUser = userRepository.findUserByUsername(username);
        if(webUser==null) throw new UsernameNotFoundException("Not found");
        else {
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(webUser.getRole()));
            return new User(webUser.getUsername(), passwordEncoder.encode(webUser.getPassword()), authorities);
        }
        // throw new UsernameNotFoundException("Not found");
    }
}
