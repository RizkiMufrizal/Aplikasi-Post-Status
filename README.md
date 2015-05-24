Aplikasi-Post-Status
====================

Cara membuat file markdown menjadi pdf :

```
pandoc --template template-penulisan.tex  --variable mainfont="Droid Serif" --variable sansfont="Droid Sans" --variable fontsize=12pt --variable version=1.0 --variable --latex-engine=xelatex --toc -N -o hasil.pdf *md
```
