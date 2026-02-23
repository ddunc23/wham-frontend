import People from "@/app/(data)/people";
import Institutions from "@/app/(data)/institutions";

export default async function Page({params}) {

    const uuid = (await params).uuid;
    const model = (await params).model;

    if (model === 'people') {
        return <People uuid={uuid} model={model} />;
    }

    if (model === 'organisations') {
        return <Institutions uuid={uuid} model={model} />;
    }
}