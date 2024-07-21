import { Component } from '../../../../class';
import { client } from '../../../../client';
import { Button, Form, InputField } from '../../../../components';

type Props = {
  onSuccess: (chatId: number) => void;
};

type State = {
  isSubmitting: boolean;
  fields: { title: string };
  errors: {
    title: string[];
  };
};

export class CreateChatForm extends Component<Props, State> {
  state: State = {
    isSubmitting: false,
    fields: { title: '' },
    errors: { title: [] }
  };
  constructor(props: Props) {
    super(props);
  }

  onFormSubmit = () => {
    const { title } = this.state.fields;
    this.setState({ isSubmitting: true });
    client
      .createChat({ title })
      .then(({ response }) => {
        this.props.onSuccess(response.id);
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
          name="title"
          type="text"
          label="Chat title"
          onChange={this.onInputChange}
          value={fields.title}
          errors={errors.title}
          required
          minLength={3}
        />
        <Button title={isSubmitting ? 'Submitting...' : 'Create'} type="submit" />
      </Form>
    );
  }
}
