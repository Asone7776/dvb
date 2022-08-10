import { FC } from "react";
import CreateForm from "../../components/CreateForm";
import { useAppSelector } from "../../redux/store";
const CreatePolicy: FC = () => {
    const safe = useAppSelector(state => state.safe.data);

    return (
        <div className="information">
            <div className="row">
                <div className="col-12">
                    <div className="top-heading">
                        {safe && (
                            <h3>{safe.tariffName}</h3>
                        )}
                    </div>
                    <CreateForm />
                </div>
            </div>
        </div>
    );
}

export default CreatePolicy;