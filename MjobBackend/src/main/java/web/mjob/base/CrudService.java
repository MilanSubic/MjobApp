package web.mjob.base;




import web.mjob.exceptions.NotFoundException;

import java.io.Serializable;
import java.util.List;

public interface CrudService <ID extends Serializable>{
    <T>List<T> findAll(Class<T> resultDtoClass) throws NotFoundException;
    <T> T findById(ID id,Class<T> resultDtoClass) throws NotFoundException;
    <T,U> T insert(U object,Class<T> resultDtoClass)throws NotFoundException;
    <T,U> T update(ID id,U object,Class<T> resultDtoClass) throws NotFoundException;
    void delete(ID id) throws NotFoundException;
}
