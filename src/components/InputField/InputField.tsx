import { useUUID } from '../../hooks';
import { Flex } from '../Flex';
import { Input } from '../Input';
import { TextError } from '../TextError';
import styles from './styles.module.scss';

type Props = {
  label: string;
  errors?: string[];
} & ComponentProps<typeof Input>;

export const InputField: FC<Props> = ({ label, errors, ...inputRest }) => {
  const id = useUUID();
  const hasErrors = errors?.length;
  return (
    <div className={styles.input_field} isColumn gap={1}>
      <label htmlFor={id}>{label}</label>
      <Input {...inputRest} id={id} />
      {hasErrors ? (
        <Flex>
          <TextError>{errors.join('.')}</TextError>
        </Flex>
      ) : null}
    </div>
  );
};
