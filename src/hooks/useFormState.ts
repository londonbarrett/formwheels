import useFieldHook from './useFieldHook';
import useFormHook from './useFormHook';

const useFormState = (props?: any): any => props ? useFieldHook(props) : useFormHook();

export default useFormState;
