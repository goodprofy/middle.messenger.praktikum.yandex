import { Flex } from '../Flex';
import { Input } from '../Input';
import { TextError } from '../TextError';
import styles from './styles.module.scss';

type Props = {
  label: string;
  errors?: string[];
} & ComponentProps<typeof Input>;

export const InputField: FC<Props> = ({ label, errors, name, ...inputRest }) => {
  const hasErrors = errors?.length;
  return (
    <div className={styles.input_field} isColumn gap={1}>
      <label for={name}>{label}</label>
      <Input {...inputRest} name={name} />
      {hasErrors ? (
        <Flex>
          <TextError>{errors.join('.')}</TextError>
        </Flex>
      ) : null}
    </div>
  );
};
