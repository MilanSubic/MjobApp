package web.mjob.base;




import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import web.mjob.exceptions.NotFoundException;
import web.mjob.models.dto.Request;

import java.io.Serializable;
import java.util.List;

public interface CrudService <ID extends Serializable>{
    <T>List<T> findAll(Class<T> resultDtoClass) throws NotFoundException;
    <T> Page<T> findAll(Pageable page, Class<T> resultDtoClass) throws NotFoundException;
     <T, F> Page<T> findAllFiltered(Request<T> request, Class<T> resultDtoClass);
    <T> T findById(ID id,Class<T> resultDtoClass) throws NotFoundException;
    <T,U> T insert(U object,Class<T> resultDtoClass)throws NotFoundException;
    <T,U> T update(ID id,U object,Class<T> resultDtoClass) throws NotFoundException;
    void delete(ID id) throws NotFoundException;
}
