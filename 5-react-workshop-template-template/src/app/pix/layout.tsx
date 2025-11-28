'use client';

import { StepControls } from "@/components/step-controls";
import { getStepIndexFromPathname } from "@/features/transactions/lib/pathname";
import { TransactionFormType } from "@/features/transactions/types";
import { useRouter, usePathname } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

const BASE_ROUTE_PATH = '/pix/'

const steps = [
    { route: '', fields: ['keyType'] },
    { route: 'input', fields: ['key'] },
    { route: 'amount', fields: ['amount'] },
    { route: 'review', fields: ['key', 'amount'] },
];

export default function CreatePixLauout({
    children
}: { children: React.ReactNode }) {

    const methods = useForm<TransactionFormType>({
        defaultValues: {
            keyType: null,
            key: '',
            amount: 0,
            description: ''
        },
        mode: 'onBlur'
    });
    const router = useRouter();
    const pathname = usePathname();

    const handleSubimit = () => {
        console.log(methods.getValues());
        toast.success('Transação efetuada');
        router.replace('/');
    };

    const { currentStepIndex, activeStep } = getStepIndexFromPathname(pathname, steps, BASE_ROUTE_PATH);

    const prevStep = () => {
        if(currentStepIndex <= 0) return;

        const previous = steps[currentStepIndex];
        router.replace(BASE_ROUTE_PATH + previous.route);
    };

    const nextStep = async () =>  {
        if(currentStepIndex >= steps.length -1) return;

        const fieldsValidate = steps[currentStepIndex].fields as (keyof TransactionFormType)[];

        const isValid = await methods.trigger(fieldsValidate);
        
        if(!isValid) return;

        const nextStep = steps[currentStepIndex + 1];
        router.replace(BASE_ROUTE_PATH + nextStep.route);
    };

    return (
        <div className="w-full max-w-lg mx-auto min-h-[600px] flex flex-col justify-between">
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleSubimit)}>
                    {children}
                    <StepControls
                        active={activeStep}
                        total={steps.length}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                </form>
            </FormProvider>
        </div>
    );
}