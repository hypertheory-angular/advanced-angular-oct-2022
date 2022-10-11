import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { AlertComponent } from '@ht/core-ui';

@Directive({
  selector: '[htSharedLoadingModes]',
})
export class LoadingModesDirective implements OnChanges {
  @Input('htSharedLoadingModes') modes: LoadingModes | null = null;

  @Input('htSharedLoadingModesLoading') loading: TemplateRef<unknown> | string =
    'Your Data Is Loading';
  @Input('htSharedLoadingModesErrored') errored: TemplateRef<unknown> | string =
    'Sorry There was an Error Loading Your Data';
  @Input('htSharedLoadingModesEmpty') empty: TemplateRef<unknown> | string =
    'There is no data';

  constructor(
    private viewContainerRef: ViewContainerRef,
    private template: TemplateRef<unknown>,
  ) {}
  ngOnChanges(): void {
    // back on solid ground
    this.viewContainerRef.clear();
    if (this.modes?.empty) {
      this.displayMessage(this.empty, 'info');
      return;
    }
    if (this.modes?.errored) {
      this.displayMessage(this.errored, 'error');
      return;
    }
    if (this.modes?.loading) {
      this.displayMessage(this.loading, 'warning');
      return;
    }

    // the default - just show the "happy path"
    this.viewContainerRef.createEmbeddedView(this.template);
  }

  private displayMessage(
    comp: TemplateRef<unknown> | string,
    style: AlertStyles,
  ) {
    if (typeof comp !== 'string') {
      this.viewContainerRef.createEmbeddedView(comp);
      return;
    } else {
      const c = this.viewContainerRef.createComponent(AlertComponent);
      c.instance.alertStyle = style;
      c.instance.message = comp;
    }
  }
}

export type LoadingModes = {
  loading: boolean;
  errored: boolean;
  empty: boolean;
};
// TODO: This should be in shared.
type AlertStyles = 'info' | 'warning' | 'success' | 'error';
