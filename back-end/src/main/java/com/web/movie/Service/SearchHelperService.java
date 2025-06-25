package com.web.movie.Service;

import org.springframework.stereotype.Service;

@Service
public class SearchHelperService {
    public int countNumberOfSameWords(String keyword,String target){
        keyword = keyword.trim().toUpperCase();
        target = target.trim().toUpperCase();
        String[] keys = keyword.split(" ");
        int count = 0;
        for(String key: keys){
            if(target.contains(key)){
                count++;
                target.replaceAll(key,"");
            }
        }
        return count;

    }
}
