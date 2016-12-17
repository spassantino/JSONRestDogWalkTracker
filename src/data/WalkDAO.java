package data;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.transaction.annotation.Transactional;

import entities.Walk;

@Transactional
public class WalkDAO {

	@PersistenceContext
	private EntityManager em;
	
	public Walk show(int id){
		return em.find(Walk.class, id);
	}
	public List<Walk> index(){
		String query = "Select w from Walk w";
		return em.createQuery(query, Walk.class).getResultList();
	}
	public Walk create(Walk newWalk){
		em.persist(newWalk);
		em.flush();
		return em.find(Walk.class, newWalk.getId());
		
	}
	public void delete(int id){
		Walk w = em.find(Walk.class, id);
		em.remove(w);
		System.out.println(id);
	}
	public Walk update(int id, Walk walkJSON){
		Walk oldWalk = em.find(Walk.class, id);
		oldWalk.setDogName(walkJSON.getDogName());
		oldWalk.setWalkDistance(walkJSON.getWalkDistance());
		oldWalk.setLengthTime(walkJSON.getLengthTime());
		oldWalk.setLocation(walkJSON.getLocation());
		em.persist(oldWalk);
		em.flush();
		return em.find(Walk.class, oldWalk.getId());
		
	}
}
