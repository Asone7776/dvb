import { FC } from "react";
import CreateForm from "../../components/CreateForm";
const CreatePolicy: FC = () => {
    return (
        <div className="information">
            <div className="row">
                <div className="col-12">
                    <div className="top-heading">
                        <h3>Полис страхования “Карточный сейф”</h3>
                        <p>
                            С КВ 70%, страховой тариф 1%
                        </p>
                    </div>
                    <CreateForm />
                </div>
            </div>
        </div>
    );
}

export default CreatePolicy;