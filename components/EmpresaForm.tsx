'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CAREERS } from '@/app/data/constants';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';

// Crear cliente de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


const formSchema = z.object({
  nombreColaborador: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  nombreEmpresa: z.string().min(2, 'El nombre de la empresa debe tener al menos 2 caracteres'),
  carrerasBuscadas: z.array(z.string()).min(1, 'Selecciona al menos una carrera'),
});

export default function EmpresaRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombreColaborador: '',
      nombreEmpresa: '',
      carrerasBuscadas: [],
    },
  });

  // Función para manejar el envío del formulario
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      // Inserta los datos en Supabase
      const { error } = await supabase
        .from('RegistroEmpresas')
        .insert([
          {
            nombreColaborador: values.nombreColaborador,
            nombreEmpresa: values.nombreEmpresa,
            carreras: values.carrerasBuscadas, 
          },
        ]);

      if (error) {
        throw error;
      }

      // Si no hubo errores, muestra el mensaje de éxito
      toast.success('¡Registro exitoso! La empresa ha sido registrada.');
      form.reset(); // Limpiar el formulario
    } catch (error) {
      // Muestra el mensaje de error si algo salió mal
      toast.error('Error al registrar. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nombreColaborador"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del colaborador</FormLabel>
              <FormControl>
                <Input placeholder="Juan Pérez" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nombreEmpresa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la empresa</FormLabel>
              <FormControl>
                <Input placeholder="Mi Empresa S.A. de C.V." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="carrerasBuscadas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carreras buscadas</FormLabel>
              <Select
                onValueChange={(value) => {
                  // Agregar la carrera seleccionada al array
                  const nuevasCarreras = [...field.value, value];
                  field.onChange(nuevasCarreras);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona las carreras que buscas" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CAREERS.map((career) => (
                    <SelectItem key={career.id} value={career.id}>
                      {career.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
              {/* Mostrar las carreras seleccionadas */}
              <div className="mt-2">
                {field.value.map((carreraId) => {
                  const carrera = CAREERS.find((c) => c.id === carreraId);
                  return (
                    <div key={carreraId} className="bg-gray-100 p-2 rounded-md">
                      {carrera?.name}
                    </div>
                  );
                })}
              </div>
            </FormItem>
          )}
        />

        {/* Botón de enviar */}
        <Button
          type="submit"
          className="w-full bg-admin-blue text-white hover:bg-admin-blue focus:bg-admin-blue active:bg-admin-blue"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registrando...' : 'Registrar empresa'}
        </Button>
      </form>
    </Form>
  );
}