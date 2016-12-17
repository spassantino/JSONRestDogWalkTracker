package controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import data.WalkDAO;

import entities.Walk;

@RestController
public class WalkController {

	@Autowired
	private WalkDAO walkdao;
	
	ObjectMapper mapper = new ObjectMapper();
	
	@RequestMapping(value = "walk/{id}", method = RequestMethod.GET)
	public Walk show(@PathVariable int id) {
		return walkdao.show(id);
	}
	
	@RequestMapping(value = "walk", method = RequestMethod.GET)
	public List<Walk> index() {
		return walkdao.index();
	}

	@RequestMapping(value = "walk", method = RequestMethod.POST)
	public Walk create(@RequestBody String walkJSON) {
		Walk n = null;
		try {
			n = mapper.readValue(walkJSON, Walk.class);
		} catch (Exception e) {
			System.out.println(e);
		}
		return walkdao.create(n);
	}

	@RequestMapping(value = "walk/{id}", method = RequestMethod.PUT)
	public Walk update(@PathVariable int id, @RequestBody String walkJSON) {
		Walk n = null;
		try {
			n = mapper.readValue(walkJSON, Walk.class);
		} catch (Exception e) {
			System.out.println(e);
		}
		return walkdao.update(id, n);
	}

	@RequestMapping(value = "walk/{id}", method = RequestMethod.DELETE)
	public List<Walk> delete(@PathVariable int id) {
		walkdao.delete(id);
		return walkdao.index();
	}

}
