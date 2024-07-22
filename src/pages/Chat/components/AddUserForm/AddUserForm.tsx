import { Component } from '../../../../class';
import { client } from '../../../../client';
import { Button, Form, InputField } from '../../../../components';

type Props = {
  chatId: number;
  onSuccess: () => void;
};

type State = {
  fields: { usersStr: string };
  errors: { usersStr: string[] };
  isSubmitting: boolean;
};

export class AddUserForm extends Component<Props, State> {
  state: State = { fields: { usersStr: '' }, errors: { usersStr: [] }, isSubmitting: false };

  constructor(props: Props) {
    super(props);
  }

  onFormSubmit = () => {
    const { chatId } = this.props;
    const { usersStr } = this.state.fields;
    this.setState({ isSubmitting: true });
    client
      .addUsersToChats({ users: [Number(usersStr)], chatId })
      .then(() => {
        this.props.onSuccess();
      })
      .finally(() => {
        this.setState({ isSubmitting: false });
      });
  };

  onInputChange = (field: string, value: string | number) => {
    this.setState({ fields: { ...this.state.fields, [field]: value } });
  };

  render() {
    const { fields, errors, isSubmitting } = this.state;
    return (
      <Form onSubmit={this.onFormSubmit}>
        <InputField
          name="usersStr"
          type="text"
          label="ID user"
          onChange={this.onInputChange}
          value={fields.usersStr}
          errors={errors.usersStr}
          required
          minLength={3}
        />
        <Button title={isSubmitting ? 'Submitting...' : 'Add'} type="submit" />
      </Form>
    );
  }
}
