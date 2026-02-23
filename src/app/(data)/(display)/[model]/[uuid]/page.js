import Person from "./Person";
import Organisation from "./Organisation";

export default async function Page({params}) {

    const uuid = (await params).uuid;
    const model = (await params).model;

    if (model === 'people') {
        return <Person uuid={uuid} model={model} />;
    }

    if (model === 'organisations') {
        return <Organisation uuid={uuid}/>;
    }
}