package com.viseo.c360.json;

import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.viseo.c360.formation.domain.formation.SessionFormation;
import com.viseo.c360.json.deserializer.formation.SessionFormationDeserializer;

public class JSONMapper extends ObjectMapper {
	
	private static final long serialVersionUID = 1L;

	public JSONMapper() {
        SimpleModule module = new SimpleModule("JSONModule", new Version(2, 0, 0, null, null, null));
       
        //module.addSerializer(Formation.class, new FormationSerializer());
       // module.addDeserializer(SessionFormation.class, new SessionFormationDeserializer());
        
        // Add more here ...
        registerModule(module);
    }
}