import { Indexed } from '../services/types';

function isEqual(a: Indexed, b: Indexed): boolean {

    return (a && b && typeof a === 'object' && typeof b === 'object') ?

        (Object.keys(a).length === Object.keys(b).length) &&

      Object.keys(a).reduce((res, key) => {

          return res && isEqual(a[key], b[key]);

      }, true) : (a === b);
}

export default isEqual;
