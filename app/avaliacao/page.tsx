"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollToPlugin from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollToPlugin);
}

const RadioGroup = ({ label, name, value, onChange }: { label: string; name: string; value: string; onChange: (name: string, value: string) => void }) => (
  <div className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
    <span className="text-gray-700 text-base">{label}</span>
    <div className="flex gap-4">
      <label className="flex items-center gap-1 cursor-pointer">
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
            value === "sim"
              ? "border-[#E27E82] bg-[#E27E82]"
              : "border-gray-300"
          }`}
          onClick={() => onChange(name, "sim")}
        >
          {value === "sim" && (
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          )}
        </div>
        <span className="text-base text-gray-600">sim</span>
      </label>
      <label className="flex items-center gap-1 cursor-pointer">
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
            value === "não"
              ? "border-[#E27E82] bg-[#E27E82]"
              : "border-gray-300"
          }`}
          onClick={() => onChange(name, "não")}
        >
          {value === "não" && (
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          )}
        </div>
        <span className="text-base text-gray-600">não</span>
      </label>
    </div>
  </div>
);

const BodyMeasurementInput = ({ label, name, value, onChange }: { label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
    <span className="text-sm font-semibold text-gray-600">{label}</span>
    <div className="flex items-center gap-1">
      <input 
        type="text" 
        name={name} 
        value={value} 
        onChange={onChange} 
        placeholder="0.0"
        className="w-16 h-8 text-center text-sm border border-gray-200 bg-white rounded-md focus:border-[#E27E82] focus:ring-1 focus:ring-[#E27E82] outline-none text-gray-800 font-bold shadow-sm"
      />
      <span className="text-xs text-gray-400">cm</span>
    </div>
  </div>
);

const CheckboxItem = ({ label, name, checked, onChange }: { label: string; name: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <label className="flex items-center gap-2 cursor-pointer select-none">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 accent-[#E27E82]"
    />
    <span className="text-base text-gray-700">{label}</span>
  </label>
);

const initialFormData = {
  nome: "", indicadoPor: "", dataNascimento: "", rg: "", cpf: "",
  estadoCivil: "", profissao: "", sexo: "", endereco: "", fone: "", email: "",
  dataAvaliacao: "", nomeResponsavel: "", queixaPrincipal: "",
  bebidasAlcoolicas: "", fumante: "", esporte: "", dormeBem: "",
  restricaoAlimentar: "", dietas: "", acompanhamentoMedico: "",
  boaDigestao: "", ingestaoAgua: "", cardiacas: "", pressao: "",
  pressaoValor: "", gases: "", gestacoes: "", ultimaMenstruacao: "",
  cicloRegular: "", biometria: "", tratamentoIndicado: "",
  usaDIU: "", ginecologicas: "", ultimaConsultaMedica: "",
  vasculares: "", reumaticas: "", alergias: "",
  diabetes: "", glicemia: "", renal: "", proteseMetalica: "",
  outrasDisfuncoes: "", outrasDisfuncoesQuais: "",
  tratamentoMedico: "", tratamentoMedicoQual: "",
  gravida: "", usandoMedicamento: "", usandoMedicamentoQual: "",
  medicamentoProlongado: "", medicamentoProlongadoQual: "",
  peso: "", busto: "", bracoEsq: "", bracoDir: "",
  abdomen: "", cintura: "", quadril: "", culote: "",
  coxaEsq: "", coxaDir: "", panturrilhaEsq: "", panturrilhaDir: "",
  facialFototipo: "",
  facialBiotipoCutaneo: "",
  facialAcne: "",
  facialLesoesComedoes: false,
  facialLesoesPustulas: false,
  facialLesoesPapulas: false,
  facialLesoesNodulos: false,
  facialLesoesMilium: false,
  facialLesoesVerrugas: false,
  facialLesoesNecrose: false,
  facialMelaninaEfelides: false,
  facialMelaninaHipocromia: false,
  facialMelaninaAcromia: false,
  facialMelaninaHipercromia: false,
  facialMelaninaMelasma: false,
  facialMelaninaCloasma: false,
  facialVascularPetequias: false,
  facialVascularHematoma: false,
  facialVascularTelangectasias: false,
  facialVascularAngioma: false,
  facialVascularCianose: false,
  facialVascularEritema: false,
  facialConteudoLiquidoBolha: false,
  facialConteudoLiquidoPustula: false,
  facialConteudoLiquidoVesicula: false,
  facialLesaoPeleCrosta: false,
  facialLesaoPeleUlceracao: false,
  facialLesaoPeleFistula: false,
  facialLesaoPeleEscoriacao: false,
  facialLesaoPeleDescamacao: false,
  facialLesaoPeleFissura: false,
  facialSequelaAtrofia: false,
  facialSequelaCicatriz: false,
  facialSequelaQueratinizacao: false,
  facialSequelaEczema: false,
  facialSequelaHiperqueratose: false,
  facialSequelaPsoriase: false,
  facialAlergia: "",
  facialDiabetes: "",
  facialNeoplasias: "",
  facialNeoplasiasQual: "",
  facialDoencasPele: "",
  facialDoencasPeleQual: "",
  facialDoencasSistemicas: "",
  facialDoencasSistemicasQual: "",
  facialTomaMedicamentos: "",
  facialTomaMedicamentosQual: "",
  facialEpilepsia: "",
  facialPinoPlacaMetalicaRosto: "",
  facialTratamentoEsteticoRecente: "",
  facialUsaLentesContato: "",
  facialProdutosDiaADia: "",
  facialTratamentoIndicado: ""
};

export default function Home() {
  const [evaluationType, setEvaluationType] = useState<"" | "corporal" | "facial">("");
  const [formStep, setFormStep] = useState(1);
  const totalSteps = evaluationType === "facial" ? 4 : 6;
  const containerRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const fixedLogoRef = useRef<HTMLDivElement>(null);
  useGSAP({ scope: containerRef });

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const target = e.target as HTMLInputElement;
    const key = name as keyof typeof initialFormData;
    
    let formattedValue = value;

    // Máscara de Telefone: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    if (name === "fone") {
      formattedValue = value.replace(/\D/g, ""); // Remove tudo que não é dígito
      if (formattedValue.length > 11) formattedValue = formattedValue.slice(0, 11); // Limita a 11 dígitos
      
      if (formattedValue.length > 2) {
        formattedValue = `(${formattedValue.slice(0, 2)}) ${formattedValue.slice(2)}`;
      }
      if (formattedValue.length > 9) {
        // Se tem 11 dígitos: (XX) XXXXX-XXXX. Se tem 10: (XX) XXXX-XXXX
        const isCell = formattedValue.length === 14 || formattedValue.replace(/\D/g, "").length === 11;
        const splitIndex = isCell ? 10 : 9;
        formattedValue = `${formattedValue.slice(0, splitIndex)}-${formattedValue.slice(splitIndex)}`;
      }
    }

    if (target.type === "checkbox") {
      setFormData((prev) => ({ ...prev, [key]: target.checked }));
      return;
    }

    setFormData((prev) => ({ ...prev, [key]: formattedValue }));
  };

  const handleRadioChange = (name: string, value: string) => {
    const key = name as keyof typeof initialFormData;
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    // 1. Anima o formulário atual sumindo para a esquerda
    gsap.to(".step-content", {
      opacity: 0,
      x: -50,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        // 2. Troca a etapa após a saída
        setFormStep((p) => Math.min(p + 1, totalSteps));
        
        // 3. Rola a tela suavemente e devagar com GSAP para ficar bem premium
        gsap.to(window, { scrollTo: { y: 0, autoKill: false }, duration: 0.8, ease: "power3.inOut" });

        // 4. Anima a entrada da nova etapa vindo da direita
        gsap.fromTo(".step-content", 
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", delay: 0.1 }
        );
      }
    });
  };

  const prevStep = () => {
    // 1. Anima o formulário atual sumindo para a direita
    gsap.to(".step-content", {
      opacity: 0,
      x: 50,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        // 2. Troca a etapa após a saída
        setFormStep((p) => Math.max(p - 1, 1));
        
        // 3. Rola a tela suavemente e devagar
        gsap.to(window, { scrollTo: { y: 0, autoKill: false }, duration: 0.8, ease: "power3.inOut" });

        // 4. Anima a entrada da nova etapa vindo da esquerda
        gsap.fromTo(".step-content", 
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out", delay: 0.1 }
        );
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.set(fixedLogoRef.current, { opacity: 1, scale: 1 });
  }, []);

  useGSAP(() => {
    if (!formContainerRef.current) return;

    gsap.set(fixedLogoRef.current, { opacity: 1, scale: 1 });

    gsap.fromTo(
      formContainerRef.current,
      { opacity: 0, scale: 0.95, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      ".form-element",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out", delay: 0.1 }
    );
  }, [evaluationType]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gray-50 font-sans overflow-hidden">
      {/* --- FORMULÁRIO (REVELADO APÓS ANIMAÇÃO) --- */}
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
          
          {/* Background Image da Clínica */}
          <div className="absolute inset-0 z-0 opacity-5 pointer-events-none overflow-hidden">
            <Image
              src="/bg-lady.svg"
              alt="Fundo decorativo"
              fill
              className="object-cover object-center"
              quality={100}
            />
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

          {/* Logo Fixa no Canto Superior / Logo no Canto Inferior na Impressão */}
          <div ref={fixedLogoRef} className="fixed top-0 right-3 sm:right-4 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md pt-4 pb-2 px-4 sm:px-5 rounded-b-3xl shadow-md border-b border-l border-r border-pink-100 print:!opacity-100 print:!top-auto print:!bottom-0 print:!right-0 print:!rounded-tl-3xl print:!rounded-tr-none print:!rounded-b-none print:!border-t print:!border-l print:!border-r-0 print:!border-b-0 print:!pt-4 print:!pb-2 print:!px-6 print:!shadow-none print:!fixed">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16">
              <Image
                src="/logo-lady-vetorizada.svg"
                alt="Logo Clínica Lady"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-[#E27E82] font-clicker text-lg sm:text-xl mt-0.5 leading-none">lady</span>
          </div>

          <div ref={formContainerRef} className="p-8 sm:p-10 space-y-8 relative z-10">
            {evaluationType === "" ? (
              <div className="step-content mt-8">
                <div className="space-y-6 form-element opacity-0 max-w-xl mx-auto">
                  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center">
                    Escolha seu tipo de avaliação
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setEvaluationType("corporal");
                        setFormStep(1);
                      }}
                      className="w-full px-8 py-5 rounded-2xl bg-white border border-pink-200 shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
                    >
                      <div className="text-[#E27E82] font-clicker text-4xl leading-none">Corporal</div>
                      <div className="text-gray-500 text-base mt-1">Avaliação corporal completa</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEvaluationType("facial");
                        setFormStep(1);
                      }}
                      className="w-full px-8 py-5 rounded-2xl bg-white border border-pink-200 shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
                    >
                      <div className="text-[#E27E82] font-clicker text-4xl leading-none">Facial</div>
                      <div className="text-gray-500 text-base mt-1">Avaliação facial personalizada</div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form className="space-y-8 step-content" onSubmit={(e) => e.preventDefault()}>
            
            {/* ETAPA 1: Dados Pessoais */}
            <div className={formStep === 1 ? 'block animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden print:block'}>
              <div className="space-y-4 form-element opacity-0">
                <h3 className="text-xl font-semibold border-b-2 border-[#E27E82] pb-1 text-gray-800 inline-block">
                  Dados Pessoais
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-base text-gray-600">Nome do Cliente:</label>
                    <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none py-1 bg-transparent transition-colors text-gray-800 font-medium text-lg" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-base text-gray-600">Indicado por:</label>
                    <input type="text" name="indicadoPor" value={formData.indicadoPor} onChange={handleChange} className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none py-1 bg-transparent transition-colors text-gray-800 font-medium text-lg" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-base text-gray-600">Data de Nascimento:</label>
                      <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none py-1 bg-transparent transition-colors text-gray-800 font-medium text-base" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-base text-gray-600">RG:</label>
                      <input type="text" name="rg" value={formData.rg} onChange={handleChange} className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none py-1 bg-transparent transition-colors text-gray-800 font-medium text-lg" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-base text-gray-600">CPF:</label>
                      <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none py-1 bg-transparent transition-colors text-gray-800 font-medium text-lg" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-base text-gray-600">Estado Civil:</label>
                      <input type="text" name="estadoCivil" value={formData.estadoCivil} onChange={handleChange} className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none py-1 bg-transparent transition-colors text-gray-800 font-medium text-lg" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-base text-gray-600">Profissão:</label>
                    <input type="text" name="profissao" value={formData.profissao} onChange={handleChange} className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none py-1 bg-transparent transition-colors text-gray-800 font-medium text-lg" />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-base text-gray-600 block mb-1">Sexo:</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="sexo" value="F" onChange={handleChange} className="accent-[#E27E82] w-4 h-4" /> <span className="text-gray-800 font-medium text-lg">F</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="sexo" value="M" onChange={handleChange} className="accent-[#E27E82] w-4 h-4" /> <span className="text-gray-800 font-medium text-lg">M</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-base text-gray-600">Endereço:</label>
                    <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none py-1 bg-transparent transition-colors text-gray-800 font-medium text-lg" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-base text-gray-600">Fone:</label>
                    <input type="tel" name="fone" value={formData.fone} onChange={handleChange} className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none py-1 bg-transparent transition-colors text-gray-800 font-medium text-lg" />
                  </div>

                  {evaluationType === "facial" && (
                    <div className="space-y-1">
                      <label className="text-base text-gray-600">E-mail:</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none py-1 bg-transparent transition-colors text-gray-800 font-medium text-lg" />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-base text-gray-600">Data da Avaliação:</label>
                    <input type="date" name="dataAvaliacao" value={formData.dataAvaliacao} onChange={handleChange} className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none py-1 bg-transparent transition-colors text-gray-800 font-medium text-base" />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-base text-gray-600">Nome do responsável em caso de menor:</label>
                    <input type="text" name="nomeResponsavel" value={formData.nomeResponsavel} onChange={handleChange} className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none py-1 bg-transparent transition-colors text-gray-800 font-medium text-lg" />
                  </div>
                </div>
              </div>
            </div>

            {evaluationType === "corporal" && (
            <>
            <div className={formStep === 2 ? 'block animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden print:block'}>
              {/* Queixa Principal */}
              <div className="space-y-2 form-element opacity-0 mb-8">
                <h3 className="text-xl font-semibold text-gray-800">Queixa Principal:</h3>
                <textarea 
                  name="queixaPrincipal"
                  value={formData.queixaPrincipal}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md p-3 focus:border-[#E27E82] focus:ring-1 focus:ring-[#E27E82] outline-none transition-all resize-none bg-gray-50/50 text-gray-800 font-medium text-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Hábitos */}
                <div className="space-y-4 form-element opacity-0">
                  <h3 className="text-xl font-semibold border-b-2 border-[#E27E82] pb-1 text-gray-800 inline-block">
                    Hábitos
                  </h3>
                  <div className="space-y-2">
                    <RadioGroup label="- Ingestão de bebidas Alcoólicas?" name="bebidasAlcoolicas" value={formData.bebidasAlcoolicas} onChange={handleRadioChange} />
                    <RadioGroup label="- Fumante?" name="fumante" value={formData.fumante} onChange={handleRadioChange} />
                    <RadioGroup label="- Pratica algum esporte?" name="esporte" value={formData.esporte} onChange={handleRadioChange} />
                    <RadioGroup label="- Dorme bem?" name="dormeBem" value={formData.dormeBem} onChange={handleRadioChange} />
                  </div>
                </div>

                {/* Alimentação */}
                <div className="space-y-4 form-element opacity-0">
                  <h3 className="text-xl font-semibold border-b-2 border-[#E27E82] pb-1 text-gray-800 inline-block">
                    Alimentação
                  </h3>
                  <div className="space-y-2">
                    <RadioGroup label="- Restrições Alimentares?" name="restricaoAlimentar" value={formData.restricaoAlimentar} onChange={handleRadioChange} />
                    <RadioGroup label="- Dietas?" name="dietas" value={formData.dietas} onChange={handleRadioChange} />
                    <RadioGroup label="- Acompanhamento Médico?" name="acompanhamentoMedico" value={formData.acompanhamentoMedico} onChange={handleRadioChange} />
                    <RadioGroup label="- Boa Digestão?" name="boaDigestao" value={formData.boaDigestao} onChange={handleRadioChange} />
                    <RadioGroup label="- Ingestão de água?" name="ingestaoAgua" value={formData.ingestaoAgua} onChange={handleRadioChange} />
                  </div>
                </div>
              </div>
            </div>

            {/* ETAPA 3: Alterações */}
            <div className={formStep === 3 ? 'block animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden print:block'}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4 form-element opacity-0">
                  <h3 className="text-xl font-semibold border-b-2 border-[#E27E82] pb-1 text-gray-800 inline-block">
                    Alterações
                  </h3>
                  <div className="space-y-3">
                    <RadioGroup label="- Cardíacas?" name="cardiacas" value={formData.cardiacas} onChange={handleRadioChange} />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-2 border-b border-gray-100">
                      <span className="text-gray-700 text-base whitespace-nowrap">- Pressão:</span>
                      <div className="flex flex-wrap items-center gap-3">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input type="radio" name="pressao" value="Hipotensão" onChange={handleChange} className="accent-[#E27E82] w-4 h-4" /> 
                          <span className="text-base text-gray-600">Hipotensão</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input type="radio" name="pressao" value="Hipertensão" onChange={handleChange} className="accent-[#E27E82] w-4 h-4" /> 
                          <span className="text-base text-gray-600">Hipertensão</span>
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input type="radio" name="pressao" value="Normal" onChange={handleChange} className="accent-[#E27E82] w-4 h-4" /> 
                          <span className="text-base text-gray-600">Normal</span>
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-base text-gray-600">Valor:</span>
                          <input type="text" name="pressaoValor" value={formData.pressaoValor} onChange={handleChange} className="w-20 border-b border-gray-300 focus:border-[#E27E82] outline-none text-center bg-transparent text-gray-800 font-medium text-lg" />
                        </div>
                      </div>
                    </div>

                    <RadioGroup label="- Retenção de Gases?" name="gases" value={formData.gases} onChange={handleRadioChange} />
                    <RadioGroup label="- Ginecológicas?" name="ginecologicas" value={formData.ginecologicas} onChange={handleRadioChange} />
                    <RadioGroup label="- Vasculares?" name="vasculares" value={formData.vasculares} onChange={handleRadioChange} />
                    <RadioGroup label="- Reumáticas?" name="reumaticas" value={formData.reumaticas} onChange={handleRadioChange} />
                    <RadioGroup label="- Alergias?" name="alergias" value={formData.alergias} onChange={handleRadioChange} />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-gray-100">
                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                        <span className="text-gray-700 text-base">- Diabetes?</span>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-1 cursor-pointer">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.diabetes === "sim" ? "border-[#E27E82] bg-[#E27E82]" : "border-gray-300"}`} onClick={() => handleRadioChange("diabetes", "sim")}>
                              {formData.diabetes === "sim" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                            </div>
                            <span className="text-base text-gray-600">sim</span>
                          </label>
                          <label className="flex items-center gap-1 cursor-pointer">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.diabetes === "não" ? "border-[#E27E82] bg-[#E27E82]" : "border-gray-300"}`} onClick={() => handleRadioChange("diabetes", "não")}>
                              {formData.diabetes === "não" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                            </div>
                            <span className="text-base text-gray-600">não</span>
                          </label>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <span className="text-gray-700 text-base">Glicemia:</span>
                        <input type="text" name="glicemia" value={formData.glicemia} onChange={handleChange} className="w-24 border-b border-gray-300 focus:border-[#E27E82] outline-none bg-transparent text-gray-800 font-medium text-lg" />
                      </div>
                    </div>

                    <RadioGroup label="- Renal?" name="renal" value={formData.renal} onChange={handleRadioChange} />
                    <RadioGroup label="- Próteses Metálicas?" name="proteseMetalica" value={formData.proteseMetalica} onChange={handleRadioChange} />
                    
                    <div className="flex items-center gap-2 py-1 border-b border-gray-100">
                      <span className="text-gray-700 text-base">- Última consulta médica:</span>
                      <input type="date" name="ultimaConsultaMedica" value={formData.ultimaConsultaMedica} onChange={handleChange} className="flex-1 border-b border-gray-300 focus:border-[#E27E82] outline-none bg-transparent text-gray-800 font-medium text-base" />
                    </div>

                    <div className="flex items-center gap-2 py-1 border-b border-gray-100">
                      <span className="text-gray-700 text-base">- Número de Gestações:</span>
                      <input type="number" name="gestacoes" value={formData.gestacoes} onChange={handleChange} className="w-16 border-b border-gray-300 focus:border-[#E27E82] outline-none text-center bg-transparent text-gray-800 font-medium text-lg" />
                    </div>

                    <div className="flex items-center gap-2 py-1 border-b border-gray-100">
                      <span className="text-gray-700 text-base">- Última menstruação (Opcional):</span>
                      <input type="date" name="ultimaMenstruacao" value={formData.ultimaMenstruacao} onChange={handleChange} className="flex-1 border-b border-gray-300 focus:border-[#E27E82] outline-none bg-transparent text-gray-800 font-medium text-base" />
                    </div>

                    <RadioGroup label="- Ciclo de Menstruação Regular?" name="cicloRegular" value={formData.cicloRegular} onChange={handleRadioChange} />
                    <RadioGroup label="- Usa D.I.U?" name="usaDIU" value={formData.usaDIU} onChange={handleRadioChange} />
                  </div>
                </div>
              </div>
            </div>

            {/* ETAPA 4: Questionário */}
            <div className={formStep === 4 ? 'block animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden print:block'}>
              <div className="space-y-4 form-element opacity-0">
                <h3 className="text-xl font-semibold border-b-2 border-[#E27E82] pb-1 text-gray-800 inline-block">
                  Questionário
                </h3>
                <div className="space-y-4 max-w-2xl">
                  
                  <div>
                    <RadioGroup label="- Possui outras disfunções aqui não descritas?" name="outrasDisfuncoes" value={formData.outrasDisfuncoes} onChange={handleRadioChange} />
                    <div className="flex items-center gap-2 py-1 mt-1 border-b border-gray-100">
                      <span className="text-gray-700 text-base">Quais?</span>
                      <input type="text" name="outrasDisfuncoesQuais" value={formData.outrasDisfuncoesQuais} onChange={handleChange} className="flex-1 border-b border-gray-300 focus:border-[#E27E82] outline-none bg-transparent text-gray-800 font-medium text-lg" />
                    </div>
                  </div>

                  <div>
                    <RadioGroup label="- Está realizando algum tratamento médico?" name="tratamentoMedico" value={formData.tratamentoMedico} onChange={handleRadioChange} />
                    <div className="flex items-center gap-2 py-1 mt-1 border-b border-gray-100">
                      <span className="text-gray-700 text-base">Qual?</span>
                      <input type="text" name="tratamentoMedicoQual" value={formData.tratamentoMedicoQual} onChange={handleChange} className="flex-1 border-b border-gray-300 focus:border-[#E27E82] outline-none bg-transparent text-gray-800 font-medium text-lg" />
                    </div>
                  </div>

                  <RadioGroup label="- Está grávida?" name="gravida" value={formData.gravida} onChange={handleRadioChange} />

                  <div>
                    <RadioGroup label="- Está usando medicamento?" name="usandoMedicamento" value={formData.usandoMedicamento} onChange={handleRadioChange} />
                    <div className="flex items-center gap-2 py-1 mt-1 border-b border-gray-100">
                      <span className="text-gray-700 text-base">Qual?</span>
                      <input type="text" name="usandoMedicamentoQual" value={formData.usandoMedicamentoQual} onChange={handleChange} className="flex-1 border-b border-gray-300 focus:border-[#E27E82] outline-none bg-transparent text-gray-800 font-medium text-lg" />
                    </div>
                  </div>

                  <div>
                    <RadioGroup label="- Ingeriu medicamento por tempo prolongado?" name="medicamentoProlongado" value={formData.medicamentoProlongado} onChange={handleRadioChange} />
                    <div className="flex items-center gap-2 py-1 mt-1 border-b border-gray-100">
                      <span className="text-gray-700 text-base">Qual?</span>
                      <input type="text" name="medicamentoProlongadoQual" value={formData.medicamentoProlongadoQual} onChange={handleChange} className="flex-1 border-b border-gray-300 focus:border-[#E27E82] outline-none bg-transparent text-gray-800 font-medium text-lg" />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ETAPA 5: Biometria */}
            <div className={formStep === 5 ? 'block animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden print:block'}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
                
                {/* Visualizador de Corpo Interativo e Tabela */}
                <div className="space-y-4 form-element opacity-0">
                  <h3 className="text-xl font-semibold border-b-2 border-[#E27E82] pb-1 text-gray-800 inline-block">
                    Medidas Corporais
                  </h3>
                  
                  {/* Imagem em cima */}
                  <div className="w-full flex justify-center">
                    <div className="relative w-full max-w-[500px] aspect-[4/5] mix-blend-multiply opacity-80">
                      <Image
                        src="/corpo-referencia.svg"
                        alt="Modelo Feminino Referência"
                        fill
  className="object-contain -scale-x-100"
                      />
                    </div>
                  </div>

                  {/* Tabela embaixo */}
                  <div className="w-full max-w-2xl bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 p-4 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                      <BodyMeasurementInput label="Peso (kg)" name="peso" value={formData.peso} onChange={handleChange} />
                      <BodyMeasurementInput label="Busto" name="busto" value={formData.busto} onChange={handleChange} />
                      <BodyMeasurementInput label="Cintura" name="cintura" value={formData.cintura} onChange={handleChange} />
                      <BodyMeasurementInput label="Abdômen" name="abdomen" value={formData.abdomen} onChange={handleChange} />
                      <BodyMeasurementInput label="Quadril" name="quadril" value={formData.quadril} onChange={handleChange} />
                      <BodyMeasurementInput label="Culote" name="culote" value={formData.culote} onChange={handleChange} />
                      <BodyMeasurementInput label="Braço Esq." name="bracoEsq" value={formData.bracoEsq} onChange={handleChange} />
                      <BodyMeasurementInput label="Braço Dir." name="bracoDir" value={formData.bracoDir} onChange={handleChange} />
                      <BodyMeasurementInput label="Coxa Esq." name="coxaEsq" value={formData.coxaEsq} onChange={handleChange} />
                      <BodyMeasurementInput label="Coxa Dir." name="coxaDir" value={formData.coxaDir} onChange={handleChange} />
                      <BodyMeasurementInput label="Panturrilha Esq." name="panturrilhaEsq" value={formData.panturrilhaEsq} onChange={handleChange} />
                      <BodyMeasurementInput label="Panturrilha Dir." name="panturrilhaDir" value={formData.panturrilhaDir} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                {/* Tratamento Indicado e Observações */}
                <div className="flex flex-col gap-8">
                  <div className="space-y-2 form-element opacity-0">
                    <h3 className="text-xl font-semibold text-gray-800">Tratamento Indicado:</h3>
                    <textarea 
                      name="tratamentoIndicado"
                      value={formData.tratamentoIndicado}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Descreva aqui o tratamento que será indicado para a paciente..."
                      className="w-full border border-gray-300 rounded-md p-3 focus:border-[#E27E82] focus:ring-1 focus:ring-[#E27E82] outline-none transition-all resize-none bg-gray-50/50 text-gray-800 font-medium text-lg"
                    />
                  </div>
                  
                  <div className="space-y-2 form-element opacity-0">
                    <h3 className="text-xl font-semibold text-gray-800">Observações Extras:</h3>
                    <textarea 
                      name="biometria"
                      value={formData.biometria}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Outros detalhes sobre a biometria ou queixas visuais..."
                      className="w-full border border-gray-300 rounded-md p-3 focus:border-[#E27E82] focus:ring-1 focus:ring-[#E27E82] outline-none transition-all resize-none bg-gray-50/50 text-gray-800 font-medium text-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ETAPA 6: Finalização */}
            <div className={formStep === 6 ? 'block animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden print:block'}>
              {/* Ficha de Acompanhamento */}
              <div className="space-y-4 form-element opacity-0">
                <h3 className="text-xl font-semibold border-b-2 border-[#E27E82] pb-1 text-gray-800 inline-block">
                  Ficha de Acompanhamento
                </h3>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                          <span className="text-gray-500 font-medium text-lg w-6">{i}.</span>
                          <span className="text-gray-700 text-base whitespace-nowrap">Data:</span>
                          <input type="date" className="border-b border-gray-300 focus:border-[#E27E82] outline-none text-center bg-transparent text-gray-800 font-medium text-base" />
                        </div>
                      <div className="pl-8">
                        <input type="text" placeholder="Anotações da sessão..." className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none bg-transparent text-gray-800 font-medium text-lg pb-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Termo de Responsabilidade */}
              <div className="pt-10 mt-8 border-t border-gray-200 form-element opacity-0">
                <h4 className="font-bold text-gray-800 underline decoration-[#E27E82] mb-2 text-lg">TERMO DE RESPONSABILIDADE</h4>
                <p className="text-base text-gray-600 font-medium mb-12 uppercase">
                  As declarações acima são expressões da verdade, não cabendo ao profissional a responsabilidade por fatos omitidos ou falsos.
                </p>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-12 sm:gap-4 px-4 sm:px-12">
                  <div className="text-center w-full sm:w-64">
                    <div className="border-b border-gray-400 mb-2"></div>
                    <p className="text-base font-medium text-gray-700">Ass. do Profissional</p>
                  </div>
                  <div className="text-center w-full sm:w-64">
                    <div className="border-b border-gray-400 mb-2"></div>
                    <p className="text-base font-medium text-gray-700">Ass. do Cliente</p>
                  </div>
                </div>
              </div>
            </div>

            </>
            )}

            {evaluationType === "facial" && (
              <>
                <div className={formStep === 2 ? 'block animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden print:block'}>
                  <div className="space-y-2 form-element opacity-0 mb-8">
                    <h3 className="text-xl font-semibold text-gray-800">Queixa Principal:</h3>
                    <textarea
                      name="queixaPrincipal"
                      value={formData.queixaPrincipal}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md p-3 focus:border-[#E27E82] focus:ring-1 focus:ring-[#E27E82] outline-none transition-all resize-none bg-gray-50/50 text-gray-800 font-medium text-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4 form-element opacity-0">
                      <h3 className="text-xl font-semibold border-b-2 border-[#E27E82] pb-1 text-gray-800 inline-block">
                        Dados Clínicos
                      </h3>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <div className="text-base font-semibold text-gray-700">Fototipo</div>
                          <div className="grid grid-cols-3 gap-2">
                            {["I", "II", "III", "IV", "V", "VI"].map((ft) => (
                              <label key={ft} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="facialFototipo"
                                  value={ft}
                                  checked={formData.facialFototipo === ft}
                                  onChange={handleChange}
                                  className="accent-[#E27E82] w-4 h-4"
                                />
                                <span className="text-base text-gray-700">{ft}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="text-base font-semibold text-gray-700">Lesões</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <CheckboxItem label="Comedões" name="facialLesoesComedoes" checked={!!formData.facialLesoesComedoes} onChange={handleChange} />
                            <CheckboxItem label="Pústulas" name="facialLesoesPustulas" checked={!!formData.facialLesoesPustulas} onChange={handleChange} />
                            <CheckboxItem label="Pápulas" name="facialLesoesPapulas" checked={!!formData.facialLesoesPapulas} onChange={handleChange} />
                            <CheckboxItem label="Nódulos" name="facialLesoesNodulos" checked={!!formData.facialLesoesNodulos} onChange={handleChange} />
                            <CheckboxItem label="Milium" name="facialLesoesMilium" checked={!!formData.facialLesoesMilium} onChange={handleChange} />
                            <CheckboxItem label="Verrugas" name="facialLesoesVerrugas" checked={!!formData.facialLesoesVerrugas} onChange={handleChange} />
                            <CheckboxItem label="Necrose" name="facialLesoesNecrose" checked={!!formData.facialLesoesNecrose} onChange={handleChange} />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="text-base font-semibold text-gray-700">Biotipo Cutâneo</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                              { label: "Normal", value: "Normal" },
                              { label: "Mista", value: "Mista" },
                              { label: "Alípica", value: "Alípica" },
                              { label: "Lipídica", value: "Lipídica" },
                            ].map((opt) => (
                              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="facialBiotipoCutaneo"
                                  value={opt.value}
                                  checked={formData.facialBiotipoCutaneo === opt.value}
                                  onChange={handleChange}
                                  className="accent-[#E27E82] w-4 h-4"
                                />
                                <span className="text-base text-gray-700">{opt.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <RadioGroup label="Acne" name="facialAcne" value={formData.facialAcne} onChange={handleRadioChange} />
                        </div>

                        <div className="space-y-3">
                          <div className="text-base font-semibold text-gray-700">Manchas (melanina)</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <CheckboxItem label="Efélides" name="facialMelaninaEfelides" checked={!!formData.facialMelaninaEfelides} onChange={handleChange} />
                            <CheckboxItem label="Hipocromia" name="facialMelaninaHipocromia" checked={!!formData.facialMelaninaHipocromia} onChange={handleChange} />
                            <CheckboxItem label="Acromia" name="facialMelaninaAcromia" checked={!!formData.facialMelaninaAcromia} onChange={handleChange} />
                            <CheckboxItem label="Hipercromia" name="facialMelaninaHipercromia" checked={!!formData.facialMelaninaHipercromia} onChange={handleChange} />
                            <CheckboxItem label="Melasma" name="facialMelaninaMelasma" checked={!!formData.facialMelaninaMelasma} onChange={handleChange} />
                            <CheckboxItem label="Cloasma" name="facialMelaninaCloasma" checked={!!formData.facialMelaninaCloasma} onChange={handleChange} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={formStep === 3 ? 'block animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden print:block'}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4 form-element opacity-0">
                      <h3 className="text-xl font-semibold border-b-2 border-[#E27E82] pb-1 text-gray-800 inline-block">
                        Condições e Histórico
                      </h3>

                      <div className="space-y-6">
                        <div className="space-y-3">
                          <div className="text-base font-semibold text-gray-700">Alterações Vasculares</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <CheckboxItem label="Petéquias" name="facialVascularPetequias" checked={!!formData.facialVascularPetequias} onChange={handleChange} />
                            <CheckboxItem label="Hematoma" name="facialVascularHematoma" checked={!!formData.facialVascularHematoma} onChange={handleChange} />
                            <CheckboxItem label="Telangectasias" name="facialVascularTelangectasias" checked={!!formData.facialVascularTelangectasias} onChange={handleChange} />
                            <CheckboxItem label="Angioma" name="facialVascularAngioma" checked={!!formData.facialVascularAngioma} onChange={handleChange} />
                            <CheckboxItem label="Cianose" name="facialVascularCianose" checked={!!formData.facialVascularCianose} onChange={handleChange} />
                            <CheckboxItem label="Eritema" name="facialVascularEritema" checked={!!formData.facialVascularEritema} onChange={handleChange} />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="text-base font-semibold text-gray-700">Conteúdo Líquido</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <CheckboxItem label="Bolha" name="facialConteudoLiquidoBolha" checked={!!formData.facialConteudoLiquidoBolha} onChange={handleChange} />
                            <CheckboxItem label="Pústula" name="facialConteudoLiquidoPustula" checked={!!formData.facialConteudoLiquidoPustula} onChange={handleChange} />
                            <CheckboxItem label="Vesícula" name="facialConteudoLiquidoVesicula" checked={!!formData.facialConteudoLiquidoVesicula} onChange={handleChange} />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="text-base font-semibold text-gray-700">Lesões de Pele</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <CheckboxItem label="Crosta" name="facialLesaoPeleCrosta" checked={!!formData.facialLesaoPeleCrosta} onChange={handleChange} />
                            <CheckboxItem label="Ulceração" name="facialLesaoPeleUlceracao" checked={!!formData.facialLesaoPeleUlceracao} onChange={handleChange} />
                            <CheckboxItem label="Fístula" name="facialLesaoPeleFistula" checked={!!formData.facialLesaoPeleFistula} onChange={handleChange} />
                            <CheckboxItem label="Escoriação" name="facialLesaoPeleEscoriacao" checked={!!formData.facialLesaoPeleEscoriacao} onChange={handleChange} />
                            <CheckboxItem label="Descamação" name="facialLesaoPeleDescamacao" checked={!!formData.facialLesaoPeleDescamacao} onChange={handleChange} />
                            <CheckboxItem label="Fissura" name="facialLesaoPeleFissura" checked={!!formData.facialLesaoPeleFissura} onChange={handleChange} />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="text-base font-semibold text-gray-700">Sequelas</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <CheckboxItem label="Atrofia" name="facialSequelaAtrofia" checked={!!formData.facialSequelaAtrofia} onChange={handleChange} />
                            <CheckboxItem label="Cicatriz" name="facialSequelaCicatriz" checked={!!formData.facialSequelaCicatriz} onChange={handleChange} />
                            <CheckboxItem label="Alterações da queratinização" name="facialSequelaQueratinizacao" checked={!!formData.facialSequelaQueratinizacao} onChange={handleChange} />
                            <CheckboxItem label="Eczema" name="facialSequelaEczema" checked={!!formData.facialSequelaEczema} onChange={handleChange} />
                            <CheckboxItem label="Hiperqueratose" name="facialSequelaHiperqueratose" checked={!!formData.facialSequelaHiperqueratose} onChange={handleChange} />
                            <CheckboxItem label="Psoríase" name="facialSequelaPsoriase" checked={!!formData.facialSequelaPsoriase} onChange={handleChange} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <RadioGroup label="Alergia" name="facialAlergia" value={formData.facialAlergia} onChange={handleRadioChange} />
                          <RadioGroup label="Diabetes" name="facialDiabetes" value={formData.facialDiabetes} onChange={handleRadioChange} />
                        </div>

                        <div className="space-y-2">
                          <RadioGroup label="Neoplasias" name="facialNeoplasias" value={formData.facialNeoplasias} onChange={handleRadioChange} />
                          {formData.facialNeoplasias === "sim" && (
                            <input
                              type="text"
                              name="facialNeoplasiasQual"
                              value={formData.facialNeoplasiasQual}
                              onChange={handleChange}
                              placeholder="Qual?"
                              className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none py-1 bg-transparent transition-colors text-gray-800 font-medium text-lg"
                            />
                          )}
                        </div>

                        <div className="space-y-2">
                          <RadioGroup label="Doenças de Pele" name="facialDoencasPele" value={formData.facialDoencasPele} onChange={handleRadioChange} />
                          {formData.facialDoencasPele === "sim" && (
                            <input
                              type="text"
                              name="facialDoencasPeleQual"
                              value={formData.facialDoencasPeleQual}
                              onChange={handleChange}
                              placeholder="Qual?"
                              className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none py-1 bg-transparent transition-colors text-gray-800 font-medium text-lg"
                            />
                          )}
                        </div>

                        <div className="space-y-2">
                          <RadioGroup label="Doenças Sistêmicas" name="facialDoencasSistemicas" value={formData.facialDoencasSistemicas} onChange={handleRadioChange} />
                          {formData.facialDoencasSistemicas === "sim" && (
                            <input
                              type="text"
                              name="facialDoencasSistemicasQual"
                              value={formData.facialDoencasSistemicasQual}
                              onChange={handleChange}
                              placeholder="Qual?"
                              className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none py-1 bg-transparent transition-colors text-gray-800 font-medium text-lg"
                            />
                          )}
                        </div>

                        <div className="space-y-2">
                          <RadioGroup label="Toma Medicamentos" name="facialTomaMedicamentos" value={formData.facialTomaMedicamentos} onChange={handleRadioChange} />
                          {formData.facialTomaMedicamentos === "sim" && (
                            <input
                              type="text"
                              name="facialTomaMedicamentosQual"
                              value={formData.facialTomaMedicamentosQual}
                              onChange={handleChange}
                              placeholder="Qual?"
                              className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none py-1 bg-transparent transition-colors text-gray-800 font-medium text-lg"
                            />
                          )}
                        </div>

                        <div className="space-y-2">
                          <RadioGroup label="Epilepsia" name="facialEpilepsia" value={formData.facialEpilepsia} onChange={handleRadioChange} />
                          <RadioGroup label="Pino/Placa metálica no rosto" name="facialPinoPlacaMetalicaRosto" value={formData.facialPinoPlacaMetalicaRosto} onChange={handleRadioChange} />
                          <RadioGroup label="Tratamento estético recente" name="facialTratamentoEsteticoRecente" value={formData.facialTratamentoEsteticoRecente} onChange={handleRadioChange} />
                          <RadioGroup label="Usa lentes de contato" name="facialUsaLentesContato" value={formData.facialUsaLentesContato} onChange={handleRadioChange} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 form-element opacity-0">
                      <h3 className="text-xl font-semibold border-b-2 border-[#E27E82] pb-1 text-gray-800 inline-block">
                        Produtos e Tratamento
                      </h3>

                      <div className="space-y-3">
                        <div className="text-base font-semibold text-gray-700">Produtos utilizados no dia a dia</div>
                        <textarea
                          name="facialProdutosDiaADia"
                          value={formData.facialProdutosDiaADia}
                          onChange={handleChange}
                          rows={6}
                          className="w-full border border-gray-300 rounded-md p-3 focus:border-[#E27E82] focus:ring-1 focus:ring-[#E27E82] outline-none transition-all resize-none bg-gray-50/50 text-gray-800 font-medium text-lg"
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="text-base font-semibold text-gray-700">Tratamento Indicado</div>
                        <textarea
                          name="facialTratamentoIndicado"
                          value={formData.facialTratamentoIndicado}
                          onChange={handleChange}
                          rows={8}
                          className="w-full border border-gray-300 rounded-md p-3 focus:border-[#E27E82] focus:ring-1 focus:ring-[#E27E82] outline-none transition-all resize-none bg-gray-50/50 text-gray-800 font-medium text-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={formStep === 4 ? 'block animate-in fade-in slide-in-from-right-4 duration-500' : 'hidden print:block'}>
                  <div className="space-y-4 form-element opacity-0">
                    <h3 className="text-xl font-semibold border-b-2 border-[#E27E82] pb-1 text-gray-800 inline-block">
                      Ficha de Acompanhamento
                    </h3>
                    <div className="space-y-6">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 font-medium text-lg w-6">{i}.</span>
                            <span className="text-gray-700 text-base whitespace-nowrap">Data:</span>
                            <input type="date" className="border-b border-gray-300 focus:border-[#E27E82] outline-none text-center bg-transparent text-gray-800 font-medium text-base" />
                          </div>
                          <div className="pl-8">
                            <input type="text" placeholder="Anotações da sessão..." className="w-full border-b border-gray-300 focus:border-[#E27E82] outline-none bg-transparent text-gray-800 font-medium text-lg pb-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-10 mt-8 border-t border-gray-200 form-element opacity-0">
                    <h4 className="font-bold text-gray-800 underline decoration-[#E27E82] mb-2 text-lg">TERMO DE RESPONSABILIDADE</h4>
                    <p className="text-base text-gray-600 font-medium mb-12 uppercase">
                      As declarações acima são expressões da verdade, não cabendo ao profissional a responsabilidade por fatos omitidos ou falsos.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-12 sm:gap-4 px-4 sm:px-12">
                      <div className="text-center w-full sm:w-64">
                        <div className="border-b border-gray-400 mb-2"></div>
                        <p className="text-base font-medium text-gray-700">Ass. do Profissional</p>
                      </div>
                      <div className="text-center w-full sm:w-64">
                        <div className="border-b border-gray-400 mb-2"></div>
                        <p className="text-base font-medium text-gray-700">Ass. do Cliente</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Navigation Buttons (Bottom Bar) */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between pt-8 border-t border-gray-100 mt-8 print:hidden form-element opacity-0 gap-4">
              <div className="w-full sm:w-auto">
                {formStep > 1 && (
                  <button 
                    type="button" 
                    onClick={prevStep}
                    className="w-full sm:w-auto px-8 py-3 rounded-full border-2 border-gray-200 text-gray-600 font-clicker text-2xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
                  >
                    Voltar
                  </button>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {formStep < totalSteps ? (
                  <button 
                    type="button" 
                    onClick={nextStep}
                    className="w-full sm:w-auto px-10 py-3 rounded-full bg-[#E27E82] text-white font-bold font-clicker text-2xl tracking-wide hover:bg-[#d66d71] transition-all shadow-[0_4px_14px_rgba(226,126,130,0.4)] hover:shadow-[0_6px_20px_rgba(226,126,130,0.6)] active:scale-95"
                  >
                    Avançar
                  </button>
                ) : (
                  <>
                    <button 
                      type="button" 
                      onClick={() => window.print()}
                      className="w-full sm:w-auto px-8 py-3 rounded-full border-2 border-[#E27E82] text-[#E27E82] font-clicker text-2xl hover:bg-pink-50 transition-all active:scale-95"
                    >
                      Imprimir
                    </button>
                    <button 
                      type="button" 
                      className="w-full sm:w-auto px-10 py-3 rounded-full bg-[#E27E82] text-white font-clicker text-2xl tracking-wide hover:bg-[#d66d71] transition-all shadow-[0_4px_14px_rgba(226,126,130,0.4)] hover:shadow-[0_6px_20px_rgba(226,126,130,0.6)] active:scale-95"
                    >
                      Finalizar Avaliação
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-100 h-2.5 rounded-full mt-6 overflow-hidden print:hidden form-element opacity-0 shadow-inner">
              <div 
                className="bg-gradient-to-r from-[#f4a7a9] to-[#E27E82] h-full transition-all duration-700 ease-out relative" 
                style={{ width: `${(formStep / totalSteps) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/20 w-full animate-[shine_2s_infinite]"></div>
              </div>
            </div>
              </form>
            )}
          </div>
      </div>
    </div>
  );
}
