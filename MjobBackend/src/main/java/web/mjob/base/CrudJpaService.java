package web.mjob.base;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.Request;
import web.mjob.util.UnpagedSorted;

import java.io.Serializable;
import java.util.List;
import java.util.stream.Collectors;

@Transactional
@Data
public abstract class CrudJpaService<E extends BaseEntity<ID>,ID extends Serializable> implements CrudService<ID> {

    private final JpaRepository<E,ID> repository;
    private final Class<E> entityClass;
    private final ModelMapper modelMapper;
    @PersistenceContext
    private EntityManager entityManager;

    public CrudJpaService(JpaRepository<E, ID> repository, ModelMapper modelMapper, Class<E> entityClass) {
        this.repository = repository;
        this.entityClass = entityClass;
        this.modelMapper = modelMapper;
    }

    @Override
    public <T> List<T> findAll(Class<T> resultDtoClass) {
        return repository.findAll().stream().map(e -> modelMapper.map(e,resultDtoClass)).collect(Collectors.toList());
    }

    public <T> Page<T> findAll(Pageable page, Class<T> resultDtoClass) {
        return repository.findAll(page).map(e->modelMapper.map(e,resultDtoClass));
    }

    public <T, F> Page<T> findAllFiltered(Request<T> request, Class<T> resultDtoClass, Authentication authentication) throws NotFoundException {
        var sort = Sort.unsorted();
        if(request.getProperty() != null){
            sort = Sort.by(request.getDirection(),request.getProperty());
        }

        var page = request.getPageSize() > 0 ? PageRequest.of(request.getCurrent(), request.getPageSize(), sort) : new UnpagedSorted(sort);

        if (request.getFilter() != null) {
            var f = modelMapper.map(request.getFilter(), entityClass);
            ExampleMatcher matcher = ExampleMatcher.matching()
                    .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
            Example<E> example = Example.of(f, matcher);
            return repository.findAll(example, page).map(e -> modelMapper.map(e, resultDtoClass));
        }
        return repository.findAll(page).map(e -> modelMapper.map(e, resultDtoClass));
    }

    @Override
    public <T> T findById(ID id, Class<T> resultDtoClass) throws NotFoundException {
        return modelMapper.map(findEntityById(id),resultDtoClass);
    }

    @Override
    public <T, U> T insert(U object, Class<T> resultDtoClass, Authentication authentication) {
        E entity = modelMapper.map(object,entityClass);
        entity.setId(null);
        entity = repository.saveAndFlush(entity);
        entityManager.refresh(entity);
        return modelMapper.map(entity ,resultDtoClass);
    }

    @Override
    public <T, U> T update(ID id, U object, Class<T> resultDtoClass) throws NotFoundException {
        if(!repository.existsById(id))
            throw new NotFoundException();
        E entity = modelMapper.map(object,entityClass);
        entity.setId(id);
        entity = repository.saveAndFlush(entity);
        entityManager.refresh(entity);
        return modelMapper.map(entity ,resultDtoClass);
    }

    public E findEntityById(ID id)throws NotFoundException{return repository.findById(id).orElseThrow(NotFoundException::new);}

    @Override
    public void delete(ID id) throws NotFoundException {
        if (!repository.existsById(id))
            throw new NotFoundException();
        repository.deleteById(id);
    }

}