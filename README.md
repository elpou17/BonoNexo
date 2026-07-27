# Contador de Beneficios — BonoNexo Style

Aplicación web estática para proyectar beneficios laborales y mostrar cuentas regresivas hacia enero y diciembre.

## Funcionalidades

- Cuenta regresiva en tiempo real.
- Cálculo de salario actualizado por porcentaje de aumento.
- Bono de enero según antigüedad y condición de “buen año”.
- Bono de diciembre.
- Doble sueldo.
- Total estimado.
- Diseño responsive.
- Tema claro/oscuro.
- Copiado rápido del resumen.

## Reglas configuradas

### Bono de diciembre
- Menos de 3 años: salario actualizado × 1.59.
- 3 años o más: salario actualizado × 2.52.

### Bono de enero
- Menos de 3 años: salario actualizado × 2.48 − bono de octubre.
- 3 años o más:
  - Año normal: salario actualizado × 6.40.
  - Buen año: salario actualizado × 6.88.

### Doble sueldo
- Equivale a un salario mensual actualizado.

## Ejecutar localmente

Abre `index.html` directamente en el navegador o utiliza Live Server en Visual Studio Code.

## Publicar en GitHub Pages

1. Sube el proyecto a un repositorio.
2. Ve a **Settings > Pages**.
3. En **Build and deployment**, selecciona `Deploy from a branch`.
4. Selecciona la rama `main` y la carpeta `/root`.
5. Guarda los cambios.

## Comandos Git

```bash
git init
git add .
git commit -m "feat: primera versión del contador de beneficios"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

## Aviso

Este proyecto es una herramienta personal de estimación y no es una aplicación oficial ni afiliada a Banreservas.
=======
# BonoNexo
Contador para Bonos
>>>>>>> a837d21d6f6d7a7413cef3bb171fa77b24136a19
