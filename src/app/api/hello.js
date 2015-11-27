import {Rest} from '../../http/rest';

@Rest('/test')
class HelloResource {
    get(){
        return {hello:'World'}
    }
}